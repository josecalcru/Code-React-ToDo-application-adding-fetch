import React, { useState, useEffect } from "react";

export const ToDoList = () => {
	var [inputValue, setInputValue] = useState("");
	const [list, setList] = useState([]);
	var [check, setCheck] = useState(false);

	var url = "https://assets.breatheco.de/apis/fake/todos/user/josecalcru";

	function handleRemove(task) {
		const newList = list.filter(item => item !== task);

		setList(newList);
	}

	const loadList = () => {
		fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				setList(data);
				//console.log({ data });
			}) //cargando la info
			.catch(error => console.error("Error:", error.message));
	};

	const newTodo = () => {
		let array = [];
		fetch(url, {
			method: "POST",
			body: JSON.stringify(array), //se envia un arreglo vacio
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				//console.log("newToDo", data);
				loadList();
			}) //cargando la
			.catch(error => console.error("Error:", error.message));
	};

	const updateTodo = lista => {
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(lista), //se envia lista todo
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				loadList();
				alert(data.result);
			}) //cargando la
			.catch(error => console.error("Error:", error.message));
	};
	const deleteTodo = () => {
		fetch(url, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				//console.log("updateTodo", data);
				newTodo();
				alert(data.result);
			}) //cargando la
			.catch(error => console.error("Error:", error.message));
	};

	useEffect(() => {
		loadList();
	}, []);

	return (
		<div className="container d-flex align-items-center flex-column">
			<div className="col-8 justify-content-center">
				<h1 className="text-center">To Do:</h1>

				<ul className="list-group text-center">
					<li>
						<input
							className="col-11 "
							type="text"
							onKeyPress={e => {
								if (e.key === "Enter") {
									if (inputValue === "") {
										alert("The input cannot be empty");
									} else {
										let obj = {
											label: inputValue,
											done: check
										};
										setList(list.concat(obj));
										setCheck(false);
										setInputValue("");
									}
								}
							}}
							onChange={e => setInputValue(e.target.value)}
							value={inputValue}></input>

						<div className="col-1">
							<label>Done</label>
							<input
								type="checkbox"
								checked={check}
								onChange={e => setCheck(e.target.checked)}
							/>
						</div>
					</li>

					{list.map((item, index) => {
						return (
							<li
								className="list-group-item"
								key={index.toString()}>
								{item.label}
								<input
									id="done"
									type="checkbox"
									checked={item.done}
								/>
								<div className="icon ml-auto">
									<i
										className="fas fa-trash-alt"
										onClick={() => handleRemove(item)}></i>
								</div>
							</li>
						);
					})}
					<div className="row d-flex justify-content-center">
						<button
							type="button"
							className="btn btn-outline-secondary"
							onClick={() => {
								updateTodo(list);
							}}>
							Save
						</button>
						<button
							type="button"
							className="btn btn-outline-secondary"
							onClick={() => {
								deleteTodo();
							}}>
							Delete
						</button>
					</div>
				</ul>
				{/* <p>Tasks to do: {list.length}</p> */}
			</div>
		</div>
	);
};
