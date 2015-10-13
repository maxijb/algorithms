package main;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Scanner;

public class Sum2 {

	public static void main(String[] args) throws FileNotFoundException {
		Scanner s = new Scanner(new File("C:/maxi/algoritmos/nums.txt"));
		ArrayList<Long> array = new ArrayList<>();
		 while (s.hasNextLong()) {
	          array.add(s.nextLong());
	     }
		 
		 System.out.println("Numbers are " + array.size());
		 
		 Map<Integer, ArrayList<Long>> X1 = new HashMap<Integer, ArrayList<Long>>();
		 
		 
		 for (Long i : array) {
			 int key = (int) Math.ceil(i / 10000);
//			 log(i + " / " + key);
			 if (X1.containsKey(key)) {
				X1.get(key).add(i); 
			 } else {
				 X1.put(key, new ArrayList<Long>());
				 X1.get(key).add(i); 
 			 }
		 }
		 
//		 log(X1.get(-1).size());
//		 log(X1.get(0).size());
//		 log(X1.get(1).size());
		 System.out.println("X1 buckets "+ X1.size());
		 
		 Map<Integer, ArrayList<Long>> X2 = new HashMap<Integer, ArrayList<Long>>();
		 Iterator it = X1.entrySet().iterator();
		 while (it.hasNext()) {
		    Map.Entry<Integer, ArrayList<Long>> pair = (Map.Entry<Integer, ArrayList<Long>>)it.next();
		    int key = (Integer) pair.getKey();
		    int[] keys = {-key, -key-1, -key-2, key, key+1, key+2};
		    for (int i: keys) {
		    	if (X1.containsKey(i)) {
		    		if (!X2.containsKey(key)) {
		    			X2.put(key, new ArrayList<Long>());
		    		}
		    		X2.get(key).addAll(X1.get(i));
		    	}
		    }
		 }
		 
		 
		 System.out.println("X2: " + X2.size());
		 
		 Map<Integer, Long[]> results = new HashMap<Integer, Long[]>();
		 it = X2.entrySet().iterator();
		 while (it.hasNext()) {
			 Map.Entry<Integer, ArrayList<Long>> pair = (Map.Entry<Integer, ArrayList<Long>>)it.next();
			 int key = pair.getKey();
			 ArrayList<Long> X2values = pair.getValue();
			 ArrayList<Long> X1values = X1.get(key);
			 
			 for (Long i: X1values) {
				 for (Long j: X2values) {
					 if (i != j && i+j >= -10000 && i+j <= 10000) {
						 results.put((int) (i+j), new Long[]{i,j});
					 }
				 }
			 }
			 
		 }
		 
		 System.out.println("Possible Ts are: " + results.size());
		 log(results);

	}
	
	private static void log(Object print) {
		System.out.println(print);
	}


}

