import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styled from 'styled-components';

const StyledUserContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 50px;
`;

const StyledUsersLi = styled.li`
	display: flex;
	margin: 10px;
`

const StyledUsersBody = styled.div`
	display: flex;
	justify-content: space-evenly;
	width: 100%;
`

const StyledUserFormContainer = styled.div`
	margin: 10px;
`

const StyledSearchContainer = styled.div`
	margin: 10px 0;
`

const App = () => {

	const [users, setUsers] = useState(null);
	const [filteredUsers, filterUsers] = useState(null);
	const [filteredCredUsers, setFilteredCredUsers] = useState(null);
	const [creditorName, setCreditorName] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [minPaymentPercentage, setMinPaymentPercentage] = useState("");
	const [balance, setBalance] = useState("");
	const [credName, setCredName] = useState("");


	function search() {
		axios
			.get('/api/users/search')
			.then(users => filterUsers(users.data))
	}

	function deleteUser(id) {
		axios
			.delete(`/api/users/${id}`)
			.then(function () {
				axios
					.get("/api/users")
					.then((users) => setUsers(users.data))
					.catch((err) => console.log(err));
			})
			.catch(function () {
				console.log('User could not be deleted')
			})
	}

	function submitCredNameForm(e) {
		e.preventDefault();
		setFilteredCredUsers(null);
		axios
			.get(`/api/users/creditorNameLookup/${credName}`)
			.then(users => setFilteredCredUsers(users.data))
			.then(function () {
				setCredName('')
			})
	}

	function submitForm(e) {
		e.preventDefault();
		axios
			.post("/api/users", {
				creditorName,
				firstName,
				lastName,
				minPaymentPercentage,
				balance
			})
			.then(function () {
				axios
					.get("/api/users")
					.then((users) => setUsers(users.data))
					.catch((err) => console.log(err));
			})
			.then(function () {
				setCreditorName('')
				setFirstName('')
				setLastName('')
				setMinPaymentPercentage('')
				setBalance('')
			})
			.catch(function () {
				console.log("Could not create account. Please try again");
			});
	}


	useEffect(() => {
		axios
			.get("/api/users")
			.then((users) => setUsers(users.data))
			.catch((err) => console.log(err));
	}, []);



	return (
		<StyledUserContainer>
			{
				users === null ? (
					<p>Loading...</p>
				) : users.length === 0 ? (
					<p>No users registered</p>
				) : (
							<StyledUsersBody>
								<StyledUserFormContainer>
									<div>Add user</div>
									<form onSubmit={(e) => submitForm(e)}>
										<input
											onChange={(e) => setCreditorName(e.target.value)}
											type="text"
											placeholder="Enter Creditor Name"
											value={creditorName}
										/>
										<input
											onChange={(e) => setFirstName(e.target.value)}
											type="text"
											placeholder="Enter First Name"
											value={firstName}
										/>
										<input
											onChange={(e) => setLastName(e.target.value)}
											type="text"
											placeholder="Enter Last Name"
											value={lastName}
										/>
										<input
											onChange={(e) => setMinPaymentPercentage(e.target.value)}
											type="text"
											placeholder="Enter Minimum Payment Percentage"
											value={minPaymentPercentage}
										/>
										<input
											onChange={(e) => setBalance(e.target.value)}
											type="text"
											placeholder="Enter Balance"
											value={balance}
										/>
										<input type="submit" value="Add User" />
									</form>
									<StyledSearchContainer>
										<form onSubmit={(e) => submitCredNameForm(e)}>
											<input
												onChange={(e) => setCredName(e.target.value)}
												type="text"
												placeholder="Enter Creditor Name"
												value={credName}
											/>
											<input type="submit" value="Search By Creditor Name" />
										</form>
										{filteredCredUsers === null ? (
											<p>Search Results</p>
										) : users.length === 0 ? (
											<p>No matching accounts found</p>
										) : (filteredCredUsers.map((user, index) => (
											<StyledUsersLi key={index}>
												<div> Creditor Name: {user.creditorName} </div>
												<div>Name: {user.firstName} {user.lastName}</div>
												<div>Minimum Payment Percentage: {user.minPaymentPercentage}</div>
												<div>balance: {user.balance}</div>
											</StyledUsersLi>
										)))}
										<button onClick={search}>Search accounts filtered By Credit Analysis</button>
										<h2>Results</h2>

										{filteredUsers === null ? (
											<p>Search Results</p>
										) : users.length === 0 ? (
											<p>No matching accounts found</p>
										) : (filteredUsers.map((user, index) => (
											<StyledUsersLi key={index}>
												<div> Creditor Name: {user.creditorName} </div>
												<div>Name: {user.firstName} {user.lastName}</div>
												<div>Minimum Payment Percentage: {user.minPaymentPercentage}</div>
												<div>balance: {user.balance}</div>
											</StyledUsersLi>
										)))}
									</StyledSearchContainer>

								</StyledUserFormContainer>
								<div>
									<h2>All Accounts</h2>
									<ol>
										{users?.map((user, index) => (
											<StyledUsersLi key={index}>
												<div>
													<div> Creditor Name: {user.creditorName} </div>
													<div>Name: {user.firstName} {user.lastName}</div>
													<div>Minimum Payment Percentage: {user.minPaymentPercentage}</div>
													<div>balance: {user.balance}</div>
												</div>
												<div>
													<button onClick={() => { deleteUser(user._id) }}>Delete account/user</button>
												</div>
											</StyledUsersLi>
										))}
									</ol>
								</div>
							</StyledUsersBody>
						)
			}
		</StyledUserContainer>
	);
}

export default App;
