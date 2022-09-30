import Home from "@/views/Home";
import AppLayout from "@/views/layout/AppLayout";
import EarnMain from "@/views/earn/index";
// import Vault from "@/views/Vault";
// import xNFT from "@/views/xNFT";
import { createRouter, createWebHashHistory } from "vue-router";
import Developers from "@/views/Developers";
import FAQ from "@/views/FAQ";
import Whitepaper from "@/views/Whitepaper";
import AboutUs from "@/views/AboutUs";
import SiteLayout from "@/views/layout/SiteLayout";

export const routes = [
  {
    path: "/",
    name: "app",
    redirect: "app/earn/dual_investment",
    component: AppLayout,
    children: [
      {
        name: "earn",
        redirect: "/app/earn/dual_investment",
        activeIcon: "earn",
        inactiveIcon: "earn",
        path: "/app/earn",
        children: [
          {
            name: "earnCategory",
            activeIcon: "",
            inactiveIcon: "",
            component: EarnMain,
            path: "/app/earn/:product",
          },
        ],
      },
      // {
      //   name: 'Vault',
      //   activeIcon: 'vault',
      //   inactiveIcon: 'vault',
      //   component: Vault,
      //   path: '/vault'
      // },
      // {
      //   name: 'X-NFT',
      //   activeIcon: 'xnft',
      //   inactiveIcon: 'xnft',
      //   component: xNFT,
      //   disabled: true,
      //   path: '/x-nft'
      // },
      // {
      //   name: 'Farm',
      //   activeIcon: 'farm',
      //   inactiveIcon: '',
      //   disabled: true,
      //   path: '/x-nft'
      // },
      // {
      //   name: 'More',
      //   activeIcon: 'more',
      //   inactiveIcon: '',
      //   path: '/more'
      // }
    ],
  },
  {
    path: "/home",
    redirect: "/home",
    component: SiteLayout,
    children: [
      {
        name: "home",
        activeIcon: "home",
        inactiveIcon: "home",
        path: "/home",
        component: Home,
      },
      {
        name: "whitepaper",
        path: "/whitepaper",
        component: Whitepaper,
      },
      {
        name: "developers",
        path: "/developers",
        component: Developers,
      },
      {
        name: "faq",
        path: "/faq",
        component: FAQ,
      },
      {
        name: "about",
        path: "/about",
        component: AboutUs,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
