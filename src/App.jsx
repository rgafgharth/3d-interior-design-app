import { Canvas } from '@react-three/fiber';
import { OrbitControls, RoundedBox } from '@react-three/drei';
import { useState } from 'react';

const furnitureCatalog = [
  { id: 'sofa', name: 'Sofa', color: '#d29a7d', dims: [2.3, 0.9, 1.1] },
  { id: 'chair', name: 'Accent Chair', color: '#b9d8dd', dims: [0.9, 0.9, 0.9] },
  { id: 'table', name: 'Coffee Table', color: '#a38d6d', dims: [1.7, 0.45, 1.1] },
  { id: 'lamp', name: 'Floor Lamp', color: '#ebd7b3', dims: [0.4, 2.1, 0.4] },
  { id: 'plant', name: 'Plant', color: '#6ba76c', dims: [0.7, 1.1, 0.7] },
  { id: 'bed', name: 'Bed', color: '#c7d2d9', dims: [2.6, 0.8, 2.1] },
];

const initialFurniture = [
  { id: 'sofa-1', type: 'sofa', color: '#d29a7d', position: [-1.6, 0.45, 1.4], rotation: 0, dims: [2.3, 0.9, 1.1] },
  { id: 'table-1', type: 'table', color: '#a38d6d', position: [0, 0.22, 1.4], rotation: 0, dims: [1.7, 0.45, 1.1] },
  { id: 'chair-1', type: 'chair', color: '#b9d8dd', position: [1.9, 0.45, 1.3], rotation: 0.8, dims: [0.9, 0.9, 0.9] },
  { id: 'plant-1', type: 'plant', color: '#6ba76c', position: [2.6, 0.55, -2.8], rotation: 0, dims: [0.7, 1.1, 0.7] },
  { id: 'lamp-1', type: 'lamp', color: '#ebd7b3', position: [-2.2, 1.05, -2.1], rotation: 0, dims: [0.4, 2.1, 0.4] },
];

function FurnitureItem({ item, selected, onSelect }) {
  const isSelected = selected === item.id;

  return (
    <group
      position={item.position}
      rotation={[0, item.rotation || 0, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item.id);
      }}
    >
      <RoundedBox args={item.dims} radius={0.08} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial
          color={isSelected ? '#f7d47d' : item.color}
          metalness={0.08}
          roughness={0.75}
          emissive={isSelected ? '#7a5e2c' : '#000000'}
          emissiveIntensity={isSelected ? 0.4 : 0}
        />
      </RoundedBox>
    </group>
  );
}

function RoomScene({ furniture, selectedId, setSelectedId }) {
  return (
    <>
      <color attach="background" args={['#eaf4ff']} />
      <fog attach="fog" args={['#eaf4ff', 10, 22]} />

      <ambientLight intensity={1.1} />
      <directionalLight position={[6, 9, 5]} intensity={1.7} castShadow />
      <spotLight position={[-4, 7, 4]} intensity={0.8} angle={0.5} penumbra={0.8} color="#fff5db" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#dfe6d8" />
      </mesh>

      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[6.5, 0.1, 6.5]} />
        <meshStandardMaterial color="#f4efe7" />
      </mesh>

      {[[-3.1, 0.5, 0], [3.1, 0.5, 0], [0, 0.5, -3.1]].map((pos, i) => (
        <mesh key={i} position={pos} receiveShadow>
          <boxGeometry args={[0.1, 1.2, 6.6]} />
          <meshStandardMaterial color="#f5f2ec" />
        </mesh>
      ))}

      <mesh position={[0, 1.05, -3.05]}>
        <boxGeometry args={[2.7, 1.8, 0.08]} />
        <meshStandardMaterial color="#cce8ff" transparent opacity={0.75} />
      </mesh>

      {furniture.map((item) => (
        <FurnitureItem key={item.id} item={item} selected={selectedId} onSelect={setSelectedId} />
      ))}
    </>
  );
}

function App() {
  const [selectedType, setSelectedType] = useState('sofa');
  const [selectedId, setSelectedId] = useState('sofa-1');
  const [furniture, setFurniture] = useState(initialFurniture);

  const addFurniture = () => {
    const template = furnitureCatalog.find((item) => item.id === selectedType);
    if (!template) return;

    const newPiece = {
      id: `custom-${Date.now()}`,
      type: template.id,
      color: template.color,
      dims: [...template.dims],
      rotation: Number((Math.random() * 1.6 - 0.8).toFixed(2)),
      position: [
        Number((Math.random() * 4 - 2).toFixed(2)),
        template.dims[1] / 2,
        Number((Math.random() * 4 - 2).toFixed(2)),
      ],
    };

    setFurniture((current) => [...current, newPiece]);
  };

  const removeSelected = () => {
    setFurniture((current) => current.filter((item) => item.id !== selectedId));
    setSelectedId('');
  };

  const resetLayout = () => {
    setFurniture(initialFurniture);
    setSelectedId('sofa-1');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Studio</p>
          <h1>Interior Design</h1>
        </div>

        <div className="panel">
          <h2>Furniture library</h2>
          <div className="catalog-grid">
            {furnitureCatalog.map((item) => (
              <button
                key={item.id}
                className={`catalog-item ${selectedType === item.id ? 'selected' : ''}`}
                onClick={() => setSelectedType(item.id)}
              >
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="panel actions-panel">
          <button className="primary" onClick={addFurniture}>Add selected</button>
          <button className="secondary" onClick={removeSelected} disabled={!selectedId}>Delete selected</button>
          <button className="secondary" onClick={resetLayout}>Reset room</button>
        </div>
      </aside>

      <main className="viewer-panel">
        <div className="topbar">
          <div>
            <p className="eyebrow">Project</p>
            <h2>Modern Living Room</h2>
          </div>
          <div className="status-pill">Browser app</div>
        </div>

        <Canvas shadows camera={{ position: [7.5, 5.5, 8], fov: 38 }}>
          <RoomScene furniture={furniture} selectedId={selectedId} setSelectedId={setSelectedId} />
          <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.2} minDistance={6} maxDistance={15} />
        </Canvas>
      </main>
    </div>
  );
}

export default App;
