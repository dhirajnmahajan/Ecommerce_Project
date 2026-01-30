import React, { useEffect, useState } from 'react'
// import { addRole, getRoles } from '../api/roles'
import { addRole, getRoles, updateRole } from '../api/roles'

function Form() {

    // const [roles, setRoles] = useState([])
    // const [roleName, setRoleName] = useState("")

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     await addRole({ name: roleName });

    //     setRoleName("")
    //     const updated = await getRoles()
    //     setRoles(updated)

    // }

    // useEffect(() => {
    //     const fetchRoles = async () => {
    //         const getData = await getRoles();
    //         setRoles(getData)
    //     }
    //     fetchRoles();
    // }, [])

    // console.log(roles);

    updateRole()
    return (
        <>
            {/* <form
                onSubmit={handleSubmit}
                className='border border-md border-white    '>

                <div>
                    <h2>Add Role</h2>
                    <div>
                        <input type="text"
                            placeholder='Enter name'
                            // value={pname}
                            name='rolename'
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)} />


                        <button type='submit'>
                            Add Role
                        </button>
                    </div>
                </div>
            </form> */}

        </>
    )
}

export default Form
