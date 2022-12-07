/* eslint-disable */
import React, { useState, useEffect, Suspense } from "react";
import { Navbar, Nav } from "rsuite";
import { Switch, Route, useHistory } from "react-router-dom";
import { LoadingPage } from "../components/LoadingPage";
import { ethers } from "ethers";

const Home = React.lazy(() => import("./Home"));
const About = React.lazy(() => import("./About"));
const MostVoted = React.lazy(() => import("./MostVoted"));
const Newest = React.lazy(() => import("./Newest"));
const PageNotFound = React.lazy(() => import("./PageNotFound"));

const config_links = {
  root: "/",
  newest: "/newest",
  mostVoted: "/most-voted",
  about: "/about",
};
const routes = [
  {
    path: config_links.root,
    component: Home,
  },
  {
    path: config_links.newest,
    component: Newest,
  },
  {
    path: config_links.mostVoted,
    component: MostVoted,
  },
  {
    path: config_links.about,
    component: About,
  },
];

interface ILayoutProps {}

const Layout: React.FC<ILayoutProps> = React.memo(({}) => {
  const history = useHistory();
  const [activeKey, setActiveKey] = useState(null);

  //@ts-ignore
  const NavBarInstance = ({ onSelect, activeKey, ...props }) => {
    return (
      <Navbar {...props}>
        <Nav onSelect={onSelect} activeKey={activeKey}>
          <Nav.Item
            eventKey="1"
            onClick={() => {
              history.push(config_links.root);
            }}
          >
            Home
          </Nav.Item>
          <Nav.Item
            eventKey="2"
            onClick={() => {
              history.push(config_links.newest);
            }}
          >
            Newest questions
          </Nav.Item>
          <Nav.Item
            eventKey="3"
            onClick={() => {
              history.push(config_links.mostVoted);
            }}
          >
            The most voted questions
          </Nav.Item>
          <Nav.Item
            eventKey="4"
            onClick={() => {
              history.push(config_links.about);
            }}
          >
            About
          </Nav.Item>
        </Nav>
      </Navbar>
    );
  };

  //-----------------------
  const [haveMetamask, sethaveMetamask] = useState(true);

  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");

  const [isConnected, setIsConnected] = useState(false);

  // @ts-ignore
  const { ethereum } = window;
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
    // @ts-ignore
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);

      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  const WalletHeader = () => {
    return (
      <header className="py-4">
        {haveMetamask ? (
          <div className="border border-solid border-gray-100 rounded-md shadow-lg py-4 px-4">
            {isConnected ? (
              <div className="card">
                <div className="flex flex-row justify-start items-start font-normal text-gray-800">
                  <div className="font-semibold">Wallet Address: &nbsp;</div>
                  <div>
                    {accountAddress.slice(0, 4)}...
                    {accountAddress.slice(20, 42)}
                  </div>
                </div>
                <div className="flex flex-row justify-start items-start font-normal text-gray-800">
                  <div className="font-semibold">Wallet Balance: &nbsp;</div>
                  <div>{accountBalance}</div>
                </div>
              </div>
            ) : (
              <div className="inline font-semibold">
                You have web3 wallet. &nbsp;
              </div>
            )}

            {isConnected ? (
              <p className="text-green-800 text-base font-semibold">
                🎉 Connected Successfully
              </p>
            ) : (
              <button
                className="text-blue-600 font-bold hover:opacity-80 cursor-pointer"
                onClick={connectWallet}
              >
                {`Please connect to it`}
              </button>
            )}
          </div>
        ) : (
          <p>Please Install MataMask</p>
        )}
      </header>
    );
  };

  return (
    <div className="">
      <NavBarInstance
        appearance="inverse"
        activeKey={activeKey}
        onSelect={setActiveKey}
      />

      <div className="px-4 py-4 md:px-10 md:py-10">
        <WalletHeader />

        <Suspense fallback={<LoadingPage />}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component ? (
                <Route
                  key={idx}
                  path={route.path}
                  exact={true}
                  render={(props) => (
                    <>
                      <route.component {...props} />
                    </>
                  )}
                />
              ) : null;
            })}
            <Route component={PageNotFound} />
          </Switch>
        </Suspense>
      </div>
    </div>
  );
});

export { Layout as default };

const styles = {};
