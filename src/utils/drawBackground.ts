export default function drawBackground(
  ctx: CanvasRenderingContext2D
): CanvasRenderingContext2D {
  const context = ctx;
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.shadowColor = '';
  context.shadowBlur = 0;
  context.beginPath();
  context.lineWidth = 1;
  context.strokeStyle = 'gray';
  for (let i = 0; i < context.canvas.width; i += 25) {
    for (let j = 0; j < context.canvas.height; j += 25) {
      ctx.strokeRect(i, j, 25, 25);
    }
  }
  context.strokeStyle = 'gray';
  context.moveTo(0, context.canvas.height / 2);
  context.lineWidth = 5;
  context.lineTo(context.canvas.width, context.canvas.height / 2);
  context.stroke();
  context.beginPath();
  context.lineWidth = 4;
  context.strokeStyle = 'DodgerBlue';
  context.shadowColor = 'MediumBlue';
  context.shadowBlur = 35;
  return context;
}
