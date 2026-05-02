import { expect, test } from "@playwright/test";

test("user can switch private media rooms between grid and list views", async ({ page }) => {
  await page.goto("/blueprints");

  await expect(
    page.getByRole("heading", { level: 1, name: /Private Media Rooms/i })
  ).toBeVisible();
  await expect(page.locator(".media-rooms-grid")).toBeVisible();

  await page.getByRole("button", { name: /List/i }).click();
  await expect(page.locator(".media-rooms-list")).toBeVisible();

  await page.getByRole("button", { name: /Grid/i }).click();
  await expect(page.locator(".media-rooms-grid")).toBeVisible();
});
