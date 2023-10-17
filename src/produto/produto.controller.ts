import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ProdutoRepository } from './produto.repository';
import { ProdutoEntity } from './produto.entity';
import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  @Post()
  async criaProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
    const produto = new ProdutoEntity();

    produto.id = randomUUID();
    produto.nome = dadosDoProduto.nome;
    produto.usuarioId = dadosDoProduto.usuarioId;
    produto.valor = dadosDoProduto.valor;
    produto.quantidade = dadosDoProduto.quantidadeDisponivel;
    produto.descricao = dadosDoProduto.descricao;
    produto.categoria = dadosDoProduto.categoria;
    produto.caracteristicas = dadosDoProduto.caracteristicas;
    produto.imagens = dadosDoProduto.imagens;

    const produtoCadastrado = await this.produtoRepository.salva(produto);

    return {
      mensagem: 'Produto criado com sucesso',
      produto: produtoCadastrado,
    };
  }

  @Get()
  async listaProdutos() {
    return this.produtoRepository.lista();
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosProduto: AtualizaProdutoDTO,
  ) {
    const produtoAlterado = await this.produtoRepository.atualiza(
      id,
      dadosProduto,
    );

    return {
      mensagem: 'Produto atualizado com sucesso',
      produto: produtoAlterado,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const produtoRemovido = await this.produtoRepository.remove(id);

    return {
      mensagem: 'Produto removido com sucesso',
      produto: produtoRemovido,
    };
  }
}
