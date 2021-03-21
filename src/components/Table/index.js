import React from 'react'

export default function Table(props) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th><button onClick={() => props.handleClick()}>Name</button></th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>DOB</th>
                </tr>
            </thead>
            <tbody>
                {props.children}
            </tbody>
        </table>
    )
}
