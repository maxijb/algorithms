package TreeNodeOperations;

import java.security.KeyStore.Entry;
import java.util.ArrayList;
import java.util.BitSet;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;



public class BinaryTreeOperations {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		
		//convert map into list
		Map<String, Integer> map = new HashMap<String, Integer>();
		map.put("max", 2);
		map.put("example", 3);
		
		List<Map.Entry<String, Integer>> arr = new ArrayList<Map.Entry<String, Integer>>(map.entrySet());
		Collections.sort(arr, new Comparator<Map.Entry<String, Integer>>(){

	         public int compare(Map.Entry<String, Integer> o1, Map.Entry<String, Integer> o2) {
	            return o2.getValue().compareTo(o1.getValue());
	    }});
		
		System.out.println(arr);
		
		
		
		//create stack owned class
		Stack<Integer> stack = new Stack<Integer>();
		stack.push(2);
		System.out.println(stack.peek());
		
		
		//BST operations
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
		System.out.println("Next del root: " + root.findNext().getKey());
		System.out.println("Next del 7: " + node7.findNext().getKey());
		
		
		int[] arra = new int[20];
		arra[0] = 20;
		assesArray(arra, 0);
		
		List<Integer> list = new ArrayList<Integer>();
		
		
		
	}
	
	public static void assesArray(int[] arr, int level) {
		System.out.println(arr[0]);
		arr[0]++;
		if (level < 2) assesArray(arr, level+1);
	}
	
	
	
	
	
	

}





