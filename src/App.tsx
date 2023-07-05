import './styles.css';
import {useState,useEffect} from 'react';
export const App = () => {
    const [text,setText] = useState('');
    const handleChange = (e:any) => {
        setText(e.target.value);
    };
    const handleSubmit = () => {
        const message = {
            user: "kenny",
            message: text,
            timestamp: 10
        };
        
    }
    return (
        <div>
            <h1>React TypeScript Webpack Starter Template</h1>
            <p>{process.env.NODE_ENV}</p>
            <p>{process.env.name}</p>
            <input type="text" onChange={handleChange} />
            <button onSubmit={handleSubmit}>Submit</button>
        </div>
    )
}