import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

const todo = [1, 2, 3, 4, 5];
const listItems = todo.map(todo => <li key={todo.toString()}>{todo}</li>);

export const ToDoList = () => {
	const [inputValue, setInputValue] = React.useState("");
	const [list, setList] = React.useState([]);

	return (
		<div>
			<input
				type="text"
				onKeyPress={e => {
					if (e.key === "Enter") {
						if (inputValue === "") {
							alert("The input cannot be empty");
						} else {
							//alert(inputValue);
							//list.push(
							setList(list.concat(inputValue)); //usar concat
						}
					}
				}}
				onChange={e => setInputValue(e.target.value)}
				value={inputValue}
			/>
			<ul className="list-group">
				{list.map((item, index) => {
					return <li key={item.toString()}>{item}</li>;
				})}
			</ul>
			{list.length}
		</div>
	);
};
