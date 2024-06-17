const { test, expect, beforeEach, describe } = require('@playwright/test')

const getValidUser = (id) => {
  return {
    name: `User ${id}`,
    username: `user${id}`,
    password: '123',
  }
}

const attemptLogin = async (page, username, password) => {
  await page.getByRole('textbox', { name: 'username' }).fill(username)
  await page.getByRole('textbox', { name: 'password' }).fill(password)
  await page.getByRole('button', { name: /log in/i }).click()
}

const getTestBlog = (id) => {
  return {
    title: `test title ${id}`,
    author: `test author ${id}`,
    url: `https://test.com/${id}`,
  }
}

const createBlog = async (page, title, author, url, isCloseModal = false) => {
  // Create blog post through modal form
  await page.getByRole('button', { name: /create/i }).click()
  await page.getByRole('textbox', { name: 'title' }).fill(title)
  await page.getByRole('textbox', { name: 'author' }).fill(author)
  await page.getByRole('textbox', { name: 'url' }).fill(url)
  await page.getByRole('button', { name: /post/i }).click()
  if (isCloseModal) {
    await page.getByLabel('Close Modal').click()
  }
}

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: getValidUser(1),
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to Bloglist')).toBeVisible()
  })

  describe('Login', () => {
    test('Succeeds with correct credentials', async ({ page }) => {
      const validUser = getValidUser(1)
      await attemptLogin(page, validUser.username, validUser.password)
      await expect(page.getByRole('button', { name: /logout/i })).toBeVisible()
    })

    test('Fails with wrong credentials', async ({ page }) => {
      await attemptLogin(page, 'invalidusername', 'password')

      const notification = await page.waitForSelector('[role="alert"] span', {
        state: 'attached', // For element to be present in DOM
        strict: true, // Resolve to a single element
      })
      expect(await notification.innerText()).toMatch(
        'Wrong username or password'
      )

      // Ensure notification message has color red #e50914
      expect(
        await notification.evaluate((el) => {
          return window.getComputedStyle(el).getPropertyValue('color')
        })
      ).toMatch('rgb(229, 9, 20)')

      await expect(
        page.getByRole('button', { name: /logout/i })
      ).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      const validUser = getValidUser(1)
      await attemptLogin(page, validUser.username, validUser.password)
    })

    test('A new blog can be created', async ({ page }) => {
      const testBlog = getTestBlog(1)
      await createBlog(page, testBlog.title, testBlog.author, testBlog.url)
      // Check success notification
      const notification = await page.waitForSelector('[role="alert"] span', {
        state: 'attached', // For element to be present in DOM
        strict: true, // Resolve to a single element
      })
      expect(await notification.innerText()).toMatch('Blog created')

      // Ensure notification message has color blue #1da1f2
      expect(
        await notification.evaluate((el) => {
          return window.getComputedStyle(el).getPropertyValue('color')
        })
      ).toMatch('rgb(29, 161, 242)')

      // Close modal
      await page.getByLabel('Close Modal').click()

      // Check test blog is created
      await expect(page.getByText(testBlog.title)).toBeVisible()
    })

    test('A blog can be liked', async ({ page }) => {
      const testBlog = getTestBlog(1)
      await createBlog(
        page,
        testBlog.title,
        testBlog.author,
        testBlog.url,
        true
      )
      await expect(page.getByTestId('like-count')).toHaveText('0')
      await page.getByLabel('Like Blog').click()
      await expect(page.getByTestId('like-count')).toHaveText('1')
    })

    describe('When multiple blogs from users exist', () => {
      beforeEach(async ({ page, request }) => {
        // Create 2 blogs as user1
        for (let i = 1; i < 3; i++) {
          const testBlog = getTestBlog(i)
          await createBlog(
            page,
            testBlog.title,
            testBlog.author,
            testBlog.url,
            true
          )
        }
        await page.getByRole('button', { name: /logout/i }).click()

        // Login and create 1 blog as user2
        const validUser = getValidUser(2)
        await request.post('http://localhost:3003/api/users', {
          data: validUser,
        })
        await attemptLogin(page, validUser.username, validUser.password)
        const testBlog = getTestBlog(3)
        await createBlog(
          page,
          testBlog.title,
          testBlog.author,
          testBlog.url,
          true
        )
      })

      test('Delete buttons of blogs can only be viewed and deleted by user who posted the blogs', async ({
        page,
      }) => {
        await expect(page.getByLabel('Delete Blog')).toHaveCount(1)
        page.on('dialog', async (dialog) => await dialog.accept())
        await page.getByLabel('Delete Blog').click()
        await expect(page.getByLabel('Delete Blog')).toHaveCount(0)
      })

      test('Blogs are arranged in descending order of likes', async ({
        page,
      }) => {
        /* Blogs are initially ordered according to their ids as test title 1, 2, 3
        and the like buttons are clicked corresponding to their initial ids,
        resulting in the final order of test title 3, 2, 1 */
        const blogs = await page.locator('article').all()
        for (let i = 0; i < blogs.length; i++) {
          const title = `test title ${i + 1}`
          await expect(blogs[i]).toContainText(title)
          await expect(blogs[i].getByTestId('like-count')).toHaveText('0')
          for (let j = i + 1; j > 0; j--) {
            await page
              .locator('article')
              .filter({ hasText: title })
              .getByLabel('Like Blog')
              .click()
          }
        }

        for (let i = 0; i < blogs.length; i++) {
          const title = `test title ${blogs.length - i}`
          await expect(blogs[i]).toContainText(title)
          await expect(blogs[i].getByTestId('like-count')).toHaveText(
            `${blogs.length - i}`
          )
        }
      })
    })
  })
})
