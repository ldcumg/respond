import GlobalsUserInfo from "@/components/globalslayout/GlobalsUserInfo";
import GlobalsNav from "@/components/globalslayout/GlobalsNav";

type Props = Readonly<{
  children: React.ReactNode;
}>;

const layout = ({ children }: Props) => {
  return (
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
  );
};

export default layout;
