import GlobalsUserInfo from "@/components/globalslayout/GlobalsUserInfo";
import GlobalsNav from "@/components/globalslayout/GlobalsNav";
import Providers from "@/components/providers/RQProvider";

type Props = Readonly<{
  children: React.ReactNode;
}>;

const layout = ({ children }: Props) => {
  return (
    <Providers>
      <div className="mx-auto flex h-[100vh] w-[90%] max-w-[1920px] gap-[20px] py-[100px]">
        <aside className="borderline w-[20%]">
          {/* <UserSearchBar /> */}
          <GlobalsUserInfo />
        </aside>
        <section className="flex w-[80%]">
          <main className="borderline w-[90%] overflow-hidden">{children}</main>
          <GlobalsNav />
        </section>
      </div>
    </Providers>
  );
};

export default layout;
