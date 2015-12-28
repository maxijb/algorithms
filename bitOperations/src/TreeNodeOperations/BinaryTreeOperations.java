package TreeNodeOperations;

import java.util.ArrayList;
import java.util.BitSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;



public class BinaryTreeOperations {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		Node root = new Node(9);
		root.add(5);
		root.add(11);
		Node node7 = root.add(7);
		root.add(3);
		root.add(1);
		root.add(1);
		root.add(20);
		
		root.log();
		
		System.out.println("balanceado: " + root.isBalancedTree());
		System.out.println("BST: " + root.isBinarySearchTree());
		System.out.println("Next del root: " + root.findNext());
		System.out.println("Next del 7: " + node7.findNext());
		
		
		int[] arr = new int[20];
		arr[0] = 20;
		assesArray(arr, 0);
		
		List<Integer> list = new ArrayList<Integer>();
		
		
		
	}
	
	public static void assesArray(int[] arr, int level) {
		System.out.println(arr[0]);
		arr[0]++;
		if (level < 2) assesArray(arr, level+1);
	}
	
	
	
	
	
	

}





