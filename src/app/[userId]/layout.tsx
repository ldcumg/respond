import GlobalsUserInfo from "@/components/globalslayout/GlobalsUserInfo";
import GlobalsNav from "@/components/globalslayout/GlobalsNav";
import UserSearchBar from "@/components/searchBar/UserSearchBar";
import LogOutButton from "@/components/LogOutButton";

type Props = Readonly<{ children: React.ReactNode }>;

const layout = ({ children }: Props) => {
  return (
    <>
      <header className="flex flex-row justify-between items-center mx-auto w-[90%] max-w-[1920px] py-[60px]">
        <div className="absolute"><LogOutButton /></div>
        <div className="absolute right-[15vw]"><UserSearchBar /></div>
      </header>
      <div className="mx-auto flex mt-[100px] h-screen w-[90%] max-w-[1920px] gap-[20px]" style={{ height: 'calc(100vh - 100px)' }}>
        <aside className="borderline w-[20%]">
          <GlobalsUserInfo />
        </aside>
        <section className="flex w-[80%]">
          <main className="borderline w-[90%] overflow-hidden">{children}</main>
          <GlobalsNav />
        </section>
      </div>
    </>
  );
};

export default layout;
