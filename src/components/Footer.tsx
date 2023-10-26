import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Footer() {
  const {
    userResponse: { token },
  } = useContext(UserContext);

  let footerComponent;

  const data = new Date().getFullYear();

  if (token !== "") {
    footerComponent = (
      <>
        <section className="mt-auto bg-inherit">
          <div className="flex flex-col justify-center items-center p-2 mt-12">
            <p className="pt-0.5">
              Savi Our Food Generation | Copyright: {data}
            </p>
            <p className="flex mt-0 pb-0.5 gap-1">
              Acesse nossa organização no GitHub:{" "}
              <a href="https://github.com/Project-SaviOurFood" target="_blank">
                <img
                  src="src/assets/github.png"
                  alt="GitHub logo"
                  width={25}
                  height={25}
                />
              </a>{" "}
            </p>
          </div>
        </section>
      </>
    );
  }

  return <>{footerComponent}</>;
}

export default Footer;
