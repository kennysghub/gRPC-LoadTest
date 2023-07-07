import './styles.css';
import HomePage from './pages/Home';
import MessageForm from './components/MessageForm';
import SendMessage from './SendMessage';
export const App = () => {
    
    return (
        <div>
            <HomePage />
            {/* <SendMessage /> */}
            <MessageForm />
        </div>
    )
}
