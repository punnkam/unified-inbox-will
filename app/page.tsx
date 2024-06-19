import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to the personal notifications settings page
  redirect("/will/settings/personal-notifications");
}
