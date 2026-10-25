import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from"react-router-dom"

function EmployeeFrom(){
    const navigate = useNavigate();
    const {id} = useParams();


    const [fromData,setFromData]=useState({
        name:"",
        id:"",
        email:"",
        department:"",
        salary:"",
        phoneNumber:""
    });
    

    const[loading,setLoading]=useState(false);
    const[submitting,setSubmitting]=useState(false);

    useEffect(()=>{
        if(!id)return;

        const fetchEmployee = async()=>{
            try {
                
            } catch (error) {
                
            }
        }
    })
}