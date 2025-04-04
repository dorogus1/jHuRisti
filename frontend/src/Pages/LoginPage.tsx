import React from 'react';
import { useState } from 'react';


//stil pt caseta de login
const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px", // Adds space between elements
};

const TextBoxStyle: React.CSSProperties = {
    width: "30vw", // 50% of the viewport width
    height: "20px", // 5% of the viewport height
    padding: "5px 10px",
    fontSize: "16px",
    textAlign: "center",
    border: "1px solid gray",
    borderRadius: "5px",
    outline: "none"
};


const LoginPage: React.FC = () =>
{

    return(
        <div style={containerStyle}>
            <h1
                style ={{
                    fontSize: "32px",
                    textAlign: "center"

                }}>
                SIGN IN/REGISTER
            </h1>
            <p style={{
                fontSize: "18px",
                marginBottom: "1px",
                textAlign: "center"
            }}>
                Name
            </p>
            <input
                type="Name"
                name="name"
                placeholder="Name"
                style={TextBoxStyle}
            />
            <p style={{
                fontSize: "18px",
                marginBottom: "1px",
                textAlign: "center"
            }}>
                Email
            </p>
            <input
                type="email"
                name="email"
                placeholder="Email"
                style={TextBoxStyle}
            />

            <p style={{
                fontSize: "18px",
                marginBottom: "1px",
                textAlign: "center"
            }}>
                Password
            </p>
            <input
                type="password"
                name="password"
                placeholder="Password"
                style={TextBoxStyle}
            />

            <button
               // onClick={handleSubmit}
                style={{
                    display: "block",
                    margin: "10px auto",
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}>
                Login
            </button>
        </div>
    );
}

export default LoginPage;