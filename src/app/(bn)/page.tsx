import HomeView from "@/components/views/HomeView";

export const revalidate = 3600;

export default function Page() {
  return <HomeView lang="bn" />;
}
