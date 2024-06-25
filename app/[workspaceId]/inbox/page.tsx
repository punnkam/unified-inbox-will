import { redirect } from "next/navigation";

export default function Inbox() {
  // Redirect to the personal notifications settings page
  redirect("./inbox/all-conversations");
}
