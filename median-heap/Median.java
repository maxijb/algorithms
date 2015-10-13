import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.PriorityQueue;
import java.util.Scanner;




public class Median {

	public static void main(String[] args) throws FileNotFoundException {
		// TODO Auto-generated method stub
		PriorityQueue<Integer> biggers = new PriorityQueue<Integer>();
		PriorityQueue<Integer> smallers = new PriorityQueue<Integer>(Collections.reverseOrder());
		ArrayList<Integer> medians = new ArrayList<Integer>();
		
		Scanner s = new Scanner(new File("C:/maxi/algoritmos/Median.txt"));
		while (s.hasNextInt()) {
			Integer num = s.nextInt();
	        Integer bottom = biggers.peek();
	        Integer top = smallers.peek();
	        
	        if (top == null || top > num) {
	        	smallers.add(num);
	        } else {
	        	biggers.add(num);
	        }
	        
	        
	        Integer minSize = smallers.size();
	        Integer maxSize = biggers.size();
	        
	        if (minSize < maxSize) {
	        	smallers.add(biggers.poll());
	        } else if (maxSize < minSize - 1) {
	        	biggers.add(smallers.poll());
	        }
	        
	        medians.add(smallers.peek());
	    }
		
		log(medians);
		Integer sumMedians = 0;
		
		for (Integer i: medians) {
			sumMedians += i;
		}
		
		log(sumMedians + " " + (sumMedians%10000));
		
		
		
		
	}
	
	private static void log(Object print) {
		System.out.println(print);
	}

}
