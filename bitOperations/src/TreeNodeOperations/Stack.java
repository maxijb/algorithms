package TreeNodeOperations;

import java.util.ArrayList;

public class Stack<T extends Object> {
	
	ArrayList<T> items;
	
	public Stack() {
		items = new ArrayList<T>();
	}
	
	public void push(T obj) {
		items.add(obj);
	}
	
	public T peek() {
		return (T) items.get(items.size()-1);
	}
	
	public T pop() {
		return items.remove(items.size()-1);
	}
}
