import { TransformedNode } from './transformed-node.model';

//export type NodeContext<N> = Pick<TransformedNode<N>, 'id' | 'data'>;
export type NodeContext<N> = TransformedNode<N>

/** The context object passed to node templates. */
export interface NodeTemplateContext<N> {
  $implicit: NodeContext<N>;
}
