export default function useNode () : any {
    const insertNode = function (tree: any, commentId: any, content: any) {
        if (tree.id === commentId) {
          tree.items.push({
            id: new Date().getTime(),
            content: content,
            items: [],
          });
    
          return tree;
        }
    
        let latestNode = [];
        latestNode = tree.items.map((ob: any) => {
          return insertNode(ob, commentId, content);
        });
    
        return { ...tree, items: latestNode };
      };
      return { insertNode };
}