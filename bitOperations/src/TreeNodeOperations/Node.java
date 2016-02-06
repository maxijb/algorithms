package TreeNodeOperations;

import java.util.ArrayList;
import java.util.List;

public class Node {
	public Node left, right, parent;
	private Integer key;
	
	
	public Node(Integer _key) { 
		this(_key, (Node) null, (Node) null, (Node) null);
	}
	
	public Node(Integer _key, Node _parent) { 
		this(_key, _parent, (Node) null, (Node) null);
	}
	
	public Node(Integer _key, Node _parent, Node _left, Node _right) {
		key = _key;
		left = _left;
		right = _right;
		parent = _parent;
	}
	
	
	public Integer getKey() {
		return this.key  == null ? null : key;
	}
	
	
	public Node add(Integer k) {
		
		if (k > key) {
			if (this.right == null) return this.right = new Node(k, this);
			else return this.right.add(k);
		} else {
			if (this.left == null) return this.left = new Node(k, this);
			else return this.left.add(k);
		}
		
	}
	
	public void log() {
		List<Node> arr = new ArrayList<Node>();
		arr.add(left);
		arr.add(right);
		System.out.println(key);
		log(arr);
	}
	
	private void log(List<Node> top) {
		ArrayList<Node> arr = new ArrayList<Node>();
		
		
		StringBuilder sb = new StringBuilder();
		
		for (Node node : top) {
			if (node != null) {
				sb.append(node.getKey()+ " ");
				arr.add(node.left);
				arr.add(node.right);
			} else {
				sb.append("null ");
			}	
		}
		
		System.out.println(sb.toString());
		if (arr.size() > 0) log(arr);
	}
	
	

	
	/* Routine to determine wheter the tree is balanced */
	public Boolean isBalancedTree() {
		int rleft = isBalancedTree(this.left, 1);
		int rright = isBalancedTree(this.right, 1);
		
		return rleft < 0 || rright < 0 ? false : Math.abs(rleft - rright) < 2;
	}
	
	
	private int isBalancedTree(Node node, int level) {
		int left = node.left == null ? level : isBalancedTree(node.left, level + 1);
		int right = node.right == null ? level : isBalancedTree(node.right, level + 1);
		
		if (left < 0 || right < 0 || Math.abs(left - right) > 1) {
			return -1;
		} else {
			return Math.max(left,  right);
		}
	}
	
	
	
	/* Determine if tree is a BST */
	public boolean isBinarySearchTree() {
		return isBinarySearchTree(this);
	}
	
	private boolean isBinarySearchTree(Node node) {
		if ((node.left != null && node.left.getKey() > node.key) || (node.right != null && node.right.getKey() < node.key)) {
			return false;
		} else {
			boolean rleft = node.left == null ? true : isBinarySearchTree(node.left);
			boolean rright = node.right == null ? true : isBinarySearchTree(node.right);
			return rleft && rright;
		}
	}
	
	
	/* Find next object in order */
	public Node findNext() {
		if (right != null) {
			Node next = right;
			while(next.left != null) next = next.left;
			return next;
		} else {
			Node next = parent;
			Node current = this;
			while (next != null) {
				if (next.left == current) {
					return next;
				} else {
					current = next;
					next = next.parent;
				}
			}
			
			return null;
		}
	}
	
	public Node findSmaller() {
		Node next = this.left;
		Node current = this;
		
		while (next != null) {
			current = next;
			next = next.left;
		}
		return current;
	}
	
	public Node findNth(Integer N) {
		Node current = findSmaller();
		int i = 0;
		while(i < N && current != null) {
			i++;
			current = findNext(); 
		}
		return current;
	}
	
}
