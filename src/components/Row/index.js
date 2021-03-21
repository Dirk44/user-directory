import React from 'react'

export default function Row(props) {
    return (
        <tr>
            <td><img src={props.img} alt={props.alt} /></td>
            <td>{props.name}</td>
            <td>{props.phone}</td>
            <td>{props.email}</td>
            <td>{props.dob}</td>
        </tr>
    )
}
