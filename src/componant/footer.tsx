import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



const Footer = () => {
    return (
            <div className="row   bg-secondary py-2">
            <div className="col-12 text-center fs-6 text-light ">
                © 2024 <span className="fw-bold text-dark">Omar Khashman</span> All Rights Reserved, Inc.
            </div>
        </div>
    );
};

export default Footer;
