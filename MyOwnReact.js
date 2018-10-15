const React = {
	createElement: (type, props, ...children) => {
		var node = transformInput(type, props, ...children);
		return createElementNode(node);
	},
	render: (app, el) => {
		return el.appendChild(app);
	},
};

let element = null;

const app = 
	React.createElement('div', { style: { backgroundColor: 'red', fontSize: '1.5em'} }, [
			React.createElement('span', undefined, 'Hello world', 
					React.createElement('br'),
					React.createElement('p', { style: { marginLeft: '80px', fontSize: '14pt'} }, 'Inner <p> tag with text'),),
			React.createElement('br'),
			React.createElement('p', null, 'An other <p> tag with "null" props.'),
			'This is just a text node',
			React.createElement('div', { textContent: 'Text content' }), 
						],
			React.createElement('br'),
			React.createElement('p', null, 'Outer of ARRAY of children tag .'),
			'This is just an outer of ARRAY of children text node'			
						);

React.render(
	app,
	document.getElementById('root'),
);

function transformInput(type, props, ...children) {
	return { type, props: props || {}, children };
};

function createElementNode(node) {
	if (node) {
		if (!!node.type) {
			element = document.createElement(node.type);
			if (node.props) {
				setProps(node);
			};
			if (!!node.children && typeof node.children === 'object' && Array.isArray(node.children)) {
				appendChildren(node);
			};
		}
	return element;
	}
};

function setProps(node) {
	Object.keys(node.props).forEach(name => {
		if (name === 'style') {
			let styleItem = node.props[name];
			if (typeof styleItem === 'object') {
				for (let key in styleItem) {
					element.style[key] = styleItem[key];
				}
			}
		} else {
			element[name] = node.props[name]
		}
	});
	return node
};

function appendChildren(node) {
	node.children.forEach((item) => {
		if (typeof item === 'string') {
		element.appendChild(document.createTextNode(item));
		} else {
			createElementNode(item);
			if (Array.isArray(item)) {
				for (let itemKey = 0; itemKey < item.length ; itemKey++) {
					if (typeof item[itemKey] === 'string') {
						element.appendChild(document.createTextNode(item[itemKey]));	
					} else {
						element.appendChild(item[itemKey]);
					}
				}
			} else {
				element.appendChild(item);
			}
		}
	})
};