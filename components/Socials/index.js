import React from "react";
import Button from "../Button";
import Image from 'next/image'

import yourData from "../../data/portfolio.json";

const Socials = ({ className }) => {
  return (
    <div className={`${className} flex flex-wrap mob:flex-nowrap link`}>
      {yourData.socials.map((social, index) => (
        <Button key={index} onClick={() => window.open(social.link)}>
          <Image src={social.img} width="30px" height="30px" alt=""/>{social.title}
        </Button>
      ))}
    </div>
  );
};

export default Socials;
