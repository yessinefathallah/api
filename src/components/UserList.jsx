import axios from "axios";
import { useEffect, useState } from "react";

const UserList = () => {
    const [Listusers, setListusers] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [ id , setId] = useState(null);

    const filteredUsers = Listusers.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const getUsers =  async() => {
            try {
                setLoading(true);
                const res = await axios.get('https://jsonplaceholder.typicode.com/users');
                setListusers(res.data);
                console.log(res.data);
                setError(null);
            } catch (error) {
                console.log(error);
                setError(error);
            }
            finally {
                setLoading(false);
            }
        }
        getUsers();
    },[])
    if (Loading) {return <h1>Loading...</h1>
    }
    if (Error) {
        return <h1>{Error.message}</h1>
    }
    return (
        <div>
            <h1>List</h1>
            <input
              type="text" value={searchTerm}   onChange={(e) => setSearchTerm(e.target.value)}   />
                <ul>
                    {filteredUsers.map((user) => (
                    <li key={user.id}>
                        {user.name}
                        <button onClick={() => setId(id === user.id ? null : user.id)}>
                            {id === user.id ? 'Hide Details' : 'Show Details'}
                        </button>
                        {id === user.id ? <h2>{user.website}</h2> : null}
                    </li>
                    ))}
                </ul>
        </div>
                )
    
}
export default UserList;