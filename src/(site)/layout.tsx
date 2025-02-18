import { Header, Footer } from "@/components/sections";
import { getNavigation, getSettings } from "@/sanity/lib/client";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navigation, settings] = await Promise.all([
    getNavigation(),
    getSettings()
  ]);

  return (
    <>
      <Header navigation={navigation} settings={settings} />
      {children}
      <Footer />
    </>
  );
} 