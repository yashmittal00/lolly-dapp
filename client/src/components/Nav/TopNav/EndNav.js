import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Toolbar, IconButton, Hidden, Tooltip, Button, Icon, SvgIcon } from "@material-ui/core";
import { setAuth, setChannelInfo } from "../../../redux/actions/channel"
import axios from "axios";
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
} from "@material-ui/icons";
import { ReactComponent as metaMaskSvg } from '../../../assets/meta-mask.svg'
import { setMobileSearch } from "../../../redux/actions/layout";
import NavUserMenuBtn from "./NavUserMenuBtn";
import NavVidMenuBtn from "./NavVidMenuBtn";
// import SignInBtn from "../../SignInBtn";
import MetaMaskOnboarding from "@metamask/onboarding"
import Web3 from "web3"
const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingLeft: "0px",
    paddingRight: "9px",
    backgroundColor: "black",
    color: "white",
  },
  walletBtn: {
    padding: "0.2rem",
    width: "23px",
    height: "25px",
  },
  walletText: {
    margin: "10px 1px",
    padding: "1px 10px",
    fontSize: "smaller",
    cursor: "pointer",
  },
  iconButton: {
    backgroundColor: "black",
    color: "white",
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "black",
      color: "white",
    },
    "&:focus": {
      outline: "white",
    }
  },
  metaMaskIcon: {
    height: "100%",
    objectFit: "contain"
  }
}));


const NavBar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(({ channel }) => channel.isAuth);
  const classes = useStyles();
  const theme = useTheme();

  const [walletStatus, setWalletStatus] = useState("NOT_CONNECTED")
  const [walletText, setWalletText] = useState("Not Connected");
  const [accountAddress, setAccountAddress] = useState(null);
  let signature = null
  let message = "Signature message in wallet";
  const onboarding = new MetaMaskOnboarding();

  // const isMetaMaskInstalled = () => {
  //   const { ethereum } = window;
  //   return Boolean(ethereum && ethereum.isMetaMask);
  // };


  // useEffect(()=> {
  //   debugger
  //   connectWallet()
  //   if (accountAddress === null) {
  //     setWalletStatus("CONNECT WALLET")
  //   } 
  //   if (isAuth) {
  //     setWalletStatus("CONNECTED")
  //   }
  //   // walletConnect()
  // },[isAuth])

  useEffect(() => {
    if (!isAuth) {
      setWalletStatus("NOT_CONNECTED")
    } else {
      setWalletStatus("CONNECTED")
    }
  }, [isAuth])

  useEffect(() => {
    setWalletText(walletStatus === "NOT_CONNECTED" ? "Not Connected" : "Connected")
  }, [walletStatus])

  const setConnected = () => {
    setWalletStatus("CONNECTED")
  }

  async function connectWallet() {
    try {
      if (window.ethereum) {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        window.web3 = new Web3(window.ethereum);
        let accounts = await window.web3.eth.getAccounts();
        let account = accounts[0];
        setAccountAddress(account)
        await signMessage()
        setChannelInfo({
          id: account
        })
        dispatch(setAuth(true))
        walletStatus === "NOT_CONNECTED" && setConnected()
      }
    }
    catch (err) {
      setWalletStatus("NOT_CONNECTED")
    }
  }
  async function signMessage() {
    signature = await window.web3.eth.personal.sign(message, accountAddress);
    // dispatch(setAuth(true))
    // dispatch(setChannelInfo({
    //   id: accountAddress, 
    // }))
    console.log("Signature: " + signature);
  }

  const installMetaMask = () => {
    onboarding.startOnboarding();
  }

  // async function getAccount() {
  //   const accounts = await window.ethereum.request({
  //     method: "eth_requestAccounts",
  //   });
  //   const account = accounts[0];
  //   return account;
  // }

  // const walletConnect = () => {
  //   if (
  //     typeof window !== "undefined" &&
  //     typeof window.ethereum !== "undefined"
  //   ) {
  //     getAccount().then((response) => {
  //       setAccountAddress(response);
  //       if (response) {
  //         dispatch(setAuth(true))
  //         dispatch(setChannelInfo({
  //           id: response,
  //         }))
  //       }});
  //   } else {
  //     console.log("error");
  //   }
  // };

  return (
    <Toolbar
      classes={{
        gutters: classes.toolbar,
      }}
    >
      <>
        <Hidden smUp>
          <IconButton
            onClick={() => dispatch(setMobileSearch(true))}
            size={theme.breakpoints.up("md") ? "small" : "medium"}
            className={classes.iconButton}
          >
            <SearchIcon />
          </IconButton>
        </Hidden>

        <Tooltip title="Create">
          <NavVidMenuBtn />
        </Tooltip>

        {
          isAuth && (
            <Hidden smDown>
              <Tooltip title="Notifications">
                <IconButton className={classes.iconButton}>
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Hidden>
          )
        }

        {/* {isAuth && <NavUserMenuBtn />} */}
        {/* {isAuth || isLogin && (
          <SignInBtn  size={theme.breakpoints.up("md") ? "medium" : "large"} />
        )} */}

        {
          !isAuth && <Tooltip title={walletText} >
            <button 
              style={{
                marginLeft: "0.5rem",
                color: "white",
                border: "0",
                borderRadius: "999px",
                padding: "0.75rem 1rem",
                background: "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(101deg, rgb(211, 18, 151), rgb(81, 145, 213))"
              }}
              onClick={() => {
                !window.ethereum && installMetaMask()
                !isAuth ? connectWallet() : setAuth(false)
              }}
            >
              {walletText}
            </button>
          </Tooltip>
        }
        {isAuth && <NavUserMenuBtn />}
      </>
    </Toolbar>
  );
};

export default NavBar;