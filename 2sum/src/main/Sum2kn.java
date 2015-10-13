package main;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Scanner;

public class Sum2kn {

	public static void main(String[] args) throws FileNotFoundException {
//		Scanner s = new Scanner(new File("C:/maxi/algoritmos/2sum_test1M.txt"));
		Scanner s = new Scanner(new File("C:/maxi/algoritmos/nums.txt"));
		ArrayList<Long> array = new ArrayList<>();
		 while (s.hasNextLong()) {
	          array.add(s.nextLong());
	     }
		 
		 System.out.println("Numbers are " + array.size());
		 
		 Map<Long, Boolean> X1 = new HashMap<Long, Boolean>();
		 
		 
		 for (Long i : array) {
			 X1.put(i, true);
		 }
		 
		 ArrayList<Integer> values = new ArrayList<>();
		 for (int i = -10000; i <= 10000; i++) {
			 values.add(i);
		 }
		 
		 
		 Map<Integer, Long[]> results = new HashMap<Integer, Long[]>();
		 
		 for (int i: values) {
			 log(i);
			 Iterator it = X1.entrySet().iterator(); 
			 while (it.hasNext()) {
				 Map.Entry<Long, Boolean> pair = (Map.Entry<Long, Boolean>)it.next();
				 long key = pair.getKey();
				 long newKey = i - pair.getKey();
				 
				 if (key != newKey && X1.containsKey(newKey)) {
					 results.put(i, new Long[]{(long) key, (long) newKey});
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

