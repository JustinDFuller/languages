import java.util.*;
import java.io.*;

public class Main {
  public static void main(String[] args) throws FileNotFoundException {
    Scanner input = new Scanner(System.in);
    StringBuilder sb = new StringBuilder();

    while(input.hasNext()) {
      sb.append(input.next());
    }

    input.close();

    Scanner fileInput = new Scanner(new FileReader(sb.toString()));

    while (fileInput.hasNextLine()) {
      System.out.println(fileInput.nextLine());
    }
  }
}
