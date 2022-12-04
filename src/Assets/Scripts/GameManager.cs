using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameManager : MonoBehaviour {

	public static GameManager Instance { get; private set; }

    public int Ammo = 20;
    public int Health = 100;
    public bool IsAlive = true;
    public bool InProgres = false;

    private void Awake()
    {
        if(Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }

    public void Reset()
    {
        Ammo = 20;
        Health = 100;
        IsAlive = true;
    }
}
