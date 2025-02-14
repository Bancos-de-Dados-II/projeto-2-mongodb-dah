import Evento from '../model/Usuario.js';

export async function listarDenuncias(req, res){
   const denuncias = await Denuncia.find();
   res.json(denuncias);
}

export async function criarDenuncia(req, res){
   const denuncias = new Denuncia(req.body);
   await denuncias.save();
   res.status(201).json(denuncias);
}

export async function deletarDenuncia(req, res){
   const id = req.params.id;
   await Denuncia.deleteOne({_id: id}).
      then(result => {
         if(result.deletedCount>0){
            res.json({message: 'Denuncia deletada com sucesso'});
            return;
         }
      })
   res.status(404).json({message: 'Denuncia não encontrada'});
}

export async function atualizarDenuncia(req, res){
   const id = req.params.id;
   Denuncia.updateOne({_id: id}, req.body).

      then(result => {
         if(result.modifiedCount>0){
            res.json({message: 'Denuncia atualizada com sucesso'});
            return;
         }
         res.status(404).json({message: 'Denuncia não encontrada'});
      })
}