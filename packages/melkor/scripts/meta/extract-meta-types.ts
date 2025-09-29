import path from 'node:path';

import ts from 'typescript';

import { rootPath } from '../utils';

const fileName = path.resolve(rootPath, 'scripts/meta/meta.ts');
const outDir = path.resolve(rootPath, 'lib');

export function extractMetaTypes() {
  const options: ts.CompilerOptions = {
    declaration: true,
    emitDeclarationOnly: true,
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    outDir,
    skipLibCheck: true,
    strict: true,
  };

  const program = ts.createProgram([fileName], options);
  program.emit();

  return path.resolve(outDir, 'meta.d.ts');
}
