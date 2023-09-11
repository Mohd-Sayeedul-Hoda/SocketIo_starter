import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');
function App() {
	const [room, setRoom] = useState('');
	const [message, setMessage] = useState('');
	const [messageReceived, setMessageReceived] = useState('');
	const sendMessage = () => {
		socket.emit('send_message', { message, room });
	};
	const joinRoom = () => {
		if (room !== '') {
			socket.emit('join_room', room);
		}
	};
	useEffect(() => {
		socket.on('receive_message', (data) => {
			setMessageReceived(data.message);
		});
	}, [socket]);
	return (
		<div className="App">
			<input
				placeholder="Join Room"
				onChange={(event) => {
					setRoom(event.target.value);
				}}
			/>
			<button onClick={joinRoom}>Join Room</button>
			<input
				placeholder="Message..."
				onChange={(event) => {
					setMessage(event.target.value);
				}}
			/>
			<button onClick={sendMessage}>Send Message</button>
			<h2>Message</h2>
			{messageReceived}
		</div>
	);
}
export default App;
