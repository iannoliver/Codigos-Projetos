package br.com.estruturas.trycatchfinally;

import java.io.FileWriter;
import java.io.IOException;

public class TryCatch3 {

	public static void main(String[] args) {
		FileWriter arquivo = null;
		try {
			arquivo = new FileWriter("arquivo.txt");
			arquivo.write("Primeiro texto");
			arquivo.write("\r\n");
			arquivo.write("Nova Mensagem");
			System.out.println("Arquivo Criado");
		}
		//IOException é especifio para arquivos
		catch(IOException arq) {
			System.out.println("Erro ao escrever! " + arq.getMessage());
		}
		catch(Exception e) {
			System.out.println("Erro inesperado! " + e.getMessage());
		}
		finally {
			try {
				arquivo.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

}
