import { expect, test } from "@playwright/test";

test("user can filter Lagos listings and start a viewing request", async ({ page }) => {
  await page.goto("/spaces");

  await expect(
    page.getByRole("heading", { level: 1, name: /Private Listings/i })
  ).toBeVisible();
  await page.getByLabel(/Search by area/i).fill("Ikoyi");
  await expect(page.getByText(/Showing/i).first()).toBeVisible();

  const listing = page.locator("article").filter({
    hasText: "Ikoyi Waterfront Penthouse",
  });

  await listing.getByRole("button", { name: /Request Private Viewing/i }).click();
  const dialog = page.getByRole("dialog", {
    name: /Ikoyi Waterfront Penthouse/i,
  });

  await expect(dialog).toBeVisible();
  await dialog.getByLabel(/Full name/i).fill("Ada Okafor");
  await dialog.getByLabel(/Email/i).fill("ada@example.com");
  await dialog.getByLabel(/Phone/i).fill("+2348012345678");
  await dialog.getByLabel(/Preferred date/i).fill("2099-05-04");
  await dialog.getByLabel(/Time slot/i).selectOption("11:00");
  await dialog.getByRole("button", { name: /Confirm Viewing Request/i }).click();
  await expect(
    page.getByRole("dialog").getByRole("link", {
      name: /Add to Google Calendar/i,
    })
  ).toBeVisible();
});
