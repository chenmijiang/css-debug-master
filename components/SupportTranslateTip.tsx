import { Callout } from 'nextra/components';

const SupportTranslateTip = () => {
  return (
    <div>
      <Callout type="warning">
        {/* Can you help us translate this page? */}
        你能帮助我们翻译这篇文章吗？
      </Callout>
      <p className="mt-6">
        请点击右侧 <strong>编辑此页面</strong>，提交你的翻译
      </p>
    </div>
  );
};

export default SupportTranslateTip;
