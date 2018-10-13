const React = {
	createElement: (type, props, ...children) => {
		var node = transformInput(type, props, ...children);
		createElementNode(node)
	},
	render: (a, el) => {
		return el.appendChild(a);
	},
};

const app = 
	React.createElement('div', { style: { backgroundColor: 'red' } }, [
						React.createElement('span', undefined, 'Hello world'),
						React.createElement('br'),
						'This is just a text node',
						React.createElement('div', { textContent: 'Text content' }), 
	]);

React.render(
	app,
	document.getElementById('root'),
);

function createElementNode(node) {
	if (node) {
		if (typeof node === 'string') {
			return document.createTextNode(node);
		};
		if (typeof node.type !== 'undefined') {
			const element = document.createElement(node.type);
			if (node.props) {
				Object.keys(node.props).forEach(name => {
					element.setAttribute(name, node.props[name]);
				})
			};
			if (typeof node.children !== 'undefined') { 
				for (let j = 0; j <= node.children.length; j++) {
					createElementNode(node.children[j]);
					element.appendChild.bind(element);
				}
			};
			return element;
		}
	}
};

function transformInput(type, props, ...children) {
	return { type, props: props || {}, children };
};