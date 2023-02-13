import * as React from 'react';
// Here we have used react-icons package for the icons
import { FaGithub, FaDev, FaLinkedin, FaQuora, FaTwitter } from 'react-icons/fa';
export const siteConfig = {
  author: {
    name: 'Santiago Vera',
    accounts: [
      {
        url: 'https://github.com/SantiagoOscarVera',
        label: 'Github Account',
        type: 'gray',
        icon: <FaGithub />
      },
      {
        url: 'https://www.linkedin.com/in/santiago-vera-programador-developer/',
        label: 'LinkedIn Account',
        type: 'linkedin',
        icon: <FaLinkedin />
      },

    ]
  }
};
