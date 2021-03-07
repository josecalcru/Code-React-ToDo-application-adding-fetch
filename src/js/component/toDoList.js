import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

const todo = [1, 2, 3, 4, 5];
const listItems = todo.map(todo => <li key={todo.toString()}>{todo}</li>);

export const ToDoList = () => {
	const [inputValue, setInputValue] = React.useState("");
	const [list, setList] = React.useState([]);

	function handleRemove(task) {
		const newList = list.filter(item => item !== task);

		setList(newList);
	}

	return (
		<div>
			<input
				type="text"
				onKeyPress={e => {
					if (e.key === "Enter") {
						if (inputValue === "") {
							alert("The input cannot be empty");
						} else {
							setList(list.concat(inputValue));
						}
					}
				}}
				onChange={e => setInputValue(e.target.value)}
				value={inputValue}
			/>
			<ul className="list-group">
				{list.map((item, index) => {
					return (
						<li key={item.toString()}>
							{item}
							<div className="icon ml-auto">
								<i
									className="fas fa-trash-alt"
									onClick={() => handleRemove(item)}></i>
							</div>
						</li>
					);
				})}
			</ul>
			{list.length}
		</div>
	);
};
