import React from "react";
import KitchenLayoutGenerator from "@/component/layout-generator/KitchenLayoutGenerator";
import Navbar from "@/component/home/Navbar";
import Footer from "@/component/home/Footer";

export default function KitchenDesignPage() {
  return (
    <div>
        {/* <Navbar/> */}
        <br/> <br/> 
        <KitchenLayoutGenerator/>
        <Footer/>
    </div>
  );
}