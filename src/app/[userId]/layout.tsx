import GlobalsUserInfo from "@/components/globalslayout/GlobalsUserInfo";
import GlobalsNav from "@/components/globalslayout/GlobalsNav";
import UserSearchBar from "@/components/searchBar/UserSearchBar";
import LogOutButton from "@/components/LogOutButton";

type Props = Readonly<{ children: React.ReactNode }>;

const layout = ({ children }: Props) => {
  return (
    <>
      <header className="mx-auto flex w-[90%] max-w-[1920px] flex-row items-center justify-between py-[60px]">
        <div className="absolute">
          <LogOutButton />
        </div>
        <div className="absolute right-[15vw]">
          <UserSearchBar />
        </div>
      </header>
      <div
        className="mx-auto flex h-[90vh] w-[90%] max-w-[1920px] gap-[20px]"
        style={{ height: "calc(100vh - 150px)" }}>
        <aside className="borderline w-[20%] !bg-[#f8f8f8] px-[20px] py-[40px]">
          <GlobalsUserInfo />
        </aside>
        <section className="flex w-[80%]">
          <main className="borderline w-[90%] overflow-hidden !bg-[#f8f8f8]">{children}</main>
          <GlobalsNav />
        </section>
      </div>
    </>
  );
};

export default layout;
