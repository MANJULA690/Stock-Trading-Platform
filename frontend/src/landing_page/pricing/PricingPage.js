import React from "react";
import PricingHero from "./Hero";
import Brokerage from "./Brokerage";
import OpenAccount from "../OpenAccount";

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <Brokerage />
      <OpenAccount />
    </>
  );
}